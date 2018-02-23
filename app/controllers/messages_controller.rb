class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    if params[:latestId].present?
      @messages = @group.messages.where('id > ?', params[:latestId]).includes(:user)
    else
      @messages = @group.messages.includes(:user)
    end
    respond_to do |format|
      format.html
      format.json
    end
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.html { redirect_to group_messages_path(@group), notice: 'メッセージが送信されました' }
        format.json
      end
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージが送信されませんでした'
      render :index
    end
  end

  private

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
